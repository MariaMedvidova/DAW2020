
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
  <xsl:template match="/">
    <xsl:result-document href="site/index.html">
      <link rel="stylesheet" type="text/css" href="../style.css"/>
      <html>
        <head>
          <title>MainPage</title>
        </head>
        <body style="background-color:lightgray;">
          <h2 style="text-align:center;">Portuguese NW archeosite dataset</h2>
          
          <table border="1" style="background-color:white;">
            <tr>
              <th>#</th>
              <th>IDENTI</th>
              <th>DESCRI</th>
              <th>FREGUE</th>
              <th>CONCEL</th>
              <th>AUTOR</th>
              <th>DATA</th>
            </tr>
          
            <xsl:apply-templates select="//ARQELEM" mode="indice">
              <xsl:sort select="IDENTI"/>
            </xsl:apply-templates>
            
          </table>
          
        </body>
      </html>
    </xsl:result-document>
    <xsl:apply-templates/>
  </xsl:template>
  
  
  <!--  Templates de índice ...................................  -->
  <xsl:template match="ARQELEM" mode="indice">
    <tr class="hover">
      
      <xsl:variable name="i" select="position()" />
      <td>
        <xsl:copy>
          <xsl:value-of select="$i"/>
        </xsl:copy>
      </td>
      
      <td>
      <a name="i{generate-id()}"/>
      <a href="{generate-id()}.html">
        <xsl:value-of select="IDENTI"/>
      </a>
      </td>
      
      <td><xsl:value-of select="DESCRI"/></td>
      <td><xsl:value-of select="FREGUE"/></td>
      <td><xsl:value-of select="CONCEL"/></td>
      <td><xsl:value-of select="AUTOR"/></td>
      <td><xsl:value-of select="DATA"/></td>
    </tr>
    
  </xsl:template>
  
  
  
  <!--  single page...............................  -->
  <xsl:template match="ARQELEM">
    <xsl:result-document href="site/{generate-id()}.html">
      <link rel="stylesheet" type="text/css" href="../style.css"/>
      <html>
        <head>
          <title>
            <xsl:value-of select="IDENTI"/>
          </title>
        </head>

        <body style="background-color:lightgray;">
          
          <p>
            <address>
              <a class="back" href="index.html#i{generate-id()}">Back to home</a>
            </address>
          </p>
          
          <table border="1" style="background-color:white;">
            <tr>
              <th> <b>TIPO:</b></th>
              <th><xsl:value-of select="TIPO"/></th>
            </tr>
          <tr>
            <th>
              <b>IDENTI:</b></th>
              <th><xsl:value-of select="IDENTI"/>
            </th>
          </tr>
          <tr>
          <th>
            <b>DESCRI:</b></th>
            <th><xsl:value-of select="DESCRI"/>
            </th>
          </tr>
          <tr>
          <th>
            <b>LUGAR:</b></th>
            <th><xsl:value-of select="LUGAR"/>
          </th>
          </tr>
          <tr>
          <th>
            <b>FREGUE:</b></th>
            <th><xsl:value-of select="FREGUE"/>
          </th>
          </tr>
          <tr>
          <th>
            <b>CONCEL:</b></th>
            <th><xsl:value-of select="CONCEL"/>
          </th>
          </tr>
          <tr>
          <th>
            <b>CODADM:</b></th>
            <th><xsl:value-of select="CODADM"/>
          </th>
          </tr>
          <tr>
          <th>
            <b>LATITU:</b></th>
            <th><xsl:value-of select="LATITU"/>
          </th>
          </tr>
          <tr>
          <th>
            <b>LONGIT:</b></th>
            <th><xsl:value-of select="LONGIT"/>
          </th>
          </tr>
          <tr>
          <th>
            <b>ALTITU:</b></th>
            <th><xsl:value-of select="ALTITU"/>
          </th>
          </tr>
          <tr>
          <th>
            <b>ACESSO:</b></th>
            <th> <xsl:value-of select="ACESSO"/>
          </th>
          </tr>
          </table>
          
          <p>
            <b>QUADRO:</b><br/>
            <xsl:value-of select="QUADRO"/>
            </p>
         
         <p>
            <b>DESARQ:</b><br/>
            <xsl:value-of select="DESARQ"/>
            </p>
       
       
       <p>
            <b>INTERP:</b><br/>
            <xsl:value-of select="INTERP"/>
            </p>
           
           <p>
            <b>DEPOSI:</b><br/>
            <xsl:value-of select="DEPOSI"/>
            </p>
           
           <p>
            <b>CRONO:</b><br/>
            <xsl:value-of select="CRONO"/>
            </p>
         
         <p>
            <b>TRAARQ:</b><br/>
            <xsl:value-of select="TRAARQ"/>
            </p>
          
          <p>
            <b>INTERE:</b><br/>
            <xsl:value-of select="INTERE"/>
          </p>
          <hr/>
          
          <p>
            <b>BIBLIO:</b><br/>
            <xsl:value-of select="BIBLIO"/>
          </p>
          
          <p>
            <b>AUTOR:</b><br/>
            <xsl:value-of select="AUTOR"/>
          </p>
          
          <p>
            <b>DATA:</b><br/>
            <xsl:value-of select="DATA"/>
          </p>
          
       
        </body>
      </html>
    </xsl:result-document>
  </xsl:template>
</xsl:stylesheet>